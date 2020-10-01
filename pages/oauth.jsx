import React, { useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Head from 'next/head'
import Footer from '../components/Footer'
import Content from '../components/Content'
import Intro from '../components/Intro'
import "../style.scss"

const questions = [
  {
    question: 'What data does Stew use from your Google account?',
    answer: 'Stew uses your email to identify you and your saved tab collections. It does not use any other information related to your account.',
    index: 0,
  },
  {
    question: 'What other data does Stew use?',
    answer: 'Stew does not save or use any information from your browsing history unless you specifically save it as a recipe. All other information you provide, such as a recipe title and tags, are also saved.',
    index: 1,
  },
  {
    question: 'What does Stew do?',
    answer: 'Stew is a browser extension that allows users to save multiple tabs and windows to launch later. It also allows you to share these configurations with others via URL.',
    index: 2,
  },
  {
    question: 'Where can I find more information?',
    answer: 'You can find Stew\'s Privacy Policy and Terms of Use in the footer of this page.',
    index: 3,
  }
]

const FAQ = () => {
  
  const [isCollapsed, setIsCollapsed] = useState({ 
    0: true,
    1: true,
    2: true,
    3: true,
  })

  function toggleCollapsed(index) {
    isCollapsed[index] = !isCollapsed[index]
    setIsCollapsed({ ...isCollapsed })
  }

  return(
    <Layout>
      <Head>
        <title>stew | OAuth Homepage </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | OAuth Homepage" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Content>
        <div className='faq__intro'>
          <Intro 
            slogan="OAuth Homepage"
          />                
        </div>
        <div className='faq__body'>
        {
          questions.map(question => (
            <div key={ question.index } className='faq__question'>
              <h2> { question.question } 
              </h2>
              <div>
                <p className={ isCollapsed[question.index] && 'faq__answer--hidden' || 'faq__answer'}> { question.answer } </p> 
                <div onClick={ () => toggleCollapsed(question.index)}><p className='link--small'>{ isCollapsed[question.index] ? 'Show more' : 'Show less' }</p> </div> 
              </div>
            </div>
          ))
        }
        </div>
      </Content>
      <Footer />
    </Layout> 
  )
}


export default FAQ