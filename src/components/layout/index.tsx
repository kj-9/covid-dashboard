import React from 'react';
import Header from './header';
import Footer from './footer';
import SEO from './seo';

export default function Layout({ children }) {

    return (
        <>
            <SEO />
            <Header />
            {children}
            <Footer />
        </>
    )
}