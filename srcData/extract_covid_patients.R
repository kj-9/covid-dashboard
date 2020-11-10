library(tidyverse)

## extract patients data
patients_url <- "https://raw.githubusercontent.com/kaz-ogiwara/covid19/master/data/prefectures.csv"
patients <- read_csv(stg_patients_url,col_types = 
                        cols(
                           year = col_double(),
                           month = col_double(),
                           date = col_double(),
                           prefectureNameJ = col_character(),
                           prefectureNameE = col_character(),
                           testedPositive = col_double(),
                           peopleTested = col_double(),
                           hospitalized = col_double(),
                           serious = col_double(),
                           discharged = col_double(),
                           deaths = col_double(),
                           effectiveReproductionNumber = col_double()
                         )) %>% 
  mutate(update_date = lubridate::ymd(paste0(year,'-', month,'-', date))) %>% 
  select(update_date,
         pref_name = prefectureNameE,
         pref_name_jp = prefectureNameJ,
         pref_n_inspections = peopleTested,
         pref_n_patients = testedPositive,
         pref_n_current_patients = hospitalized,
         pref_n_current_heavy_patients = serious,
         pref_n_deaths = deaths,
         pref_n_exits = discharged) 

## extract bedss data
beds_url <- "https://docs.google.com/spreadsheets/d/1u0Ul8TgJDqoZMnqFrILyXzTHvuHMht1El7wDZeVrpp8/export?format=csv"

beds <- read_csv(beds_url,
                 # set column names
                 col_names = c("pref_name_jp",
                              "pref_n_beds",
                              "update_date",
                              "source",
                              "note"),
                 # set column types
                 col_types = cols(
                    pref_name_jp = col_character(),
                    pref_n_beds = col_double(),
                    update_date = col_date("%Y/%m/%d"),
                    source = col_character(),
                    note = col_character()),
                 # skip header for column names are manually set
                 skip = 1
                 )

## transform latest beds by prefecture
latest_beds <- beds %>% 
  group_by(pref_name_jp) %>%
  mutate(beds_latest_update_date = max(update_date)) %>% 
  filter(update_date == beds_latest_update_date) %>% 
  arrange(pref_name_jp, desc(pref_n_beds)) %>% 
  mutate(row_number = row_number()) %>%
  filter(row_number == 1) %>% 
  ungroup()

# check length
stopifnot(nrow(latest_beds) == 47)

## join latest beds and patients
df_merged <- latest_beds %>%
  select(-update_date) %>% 
  full_join(patients, ., by = "pref_name_jp") %>% 
  mutate(pref_positive_rate = pref_n_patients / pref_n_inspections,
         pref_patients_beds_ratio = pref_n_current_patients / pref_n_beds,
         pref_heavy_patients_beds_ratio = pref_n_current_heavy_patients / pref_n_beds
         ) %>% 
  mutate(across(where(is.numeric), ~replace_na(.x, 0))) %>%  # if date columns are include, throws error...
  arrange(update_date, pref_name_jp)


## extract latest date of patients data
df_latest <- df_merged %>% 
  filter(update_date == max(update_date))

# check length
df_latest %>%
  count(pref_name_jp) %>%
  pull(n) %>% 
  sum() %>%
  {stopifnot(. == 47)}

## extract last 1w patients data
df_last_1w <- df_merged %>% 
  select(starts_with('pref'), update_date) %>% 
  filter(between(update_date, max(update_date) - 6, max(update_date)))

# check length
df_last_1w %>%
  count(pref_name_jp, update_date) %>%
  pull(n) %>% 
  sum() %>%
  {stopifnot(. == 47*7)}

## nest last 1w, and merge with latest date data
out <- df_last_1w %>% 
  group_nest(pref_name, pref_name_jp, .key = 'last_1w') %>% 
  inner_join(df_latest, by = 'pref_name_jp')

## write output
jsonlite::write_json(out, './data/covid_patients.json')

