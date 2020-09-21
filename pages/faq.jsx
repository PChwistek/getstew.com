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
    question: 'What is Stew?',
    answer: 'Stew is a blah blah blah blah blah blah blah blah',
    index: 0,
  },
  {
    question: 'How does Stew work?',
    answer: 'Stew works blah blahbah',
    index: 1,
  },
  {
    question: 'What browsers does Stew support?',
    answer: 'Stew is available on blah blah blah',
    index: 2,
  },
  {
    question: 'What is a recipe?',
    answer: 'Stew works blah blahbah',
    index: 3
  },
  {
    question: 'Are my tabs secure?',
    answer: 'Stew works blah blahbah',
    index: 4,
  },
  {
    question: 'Does Stew sell my data?',
    answer: 'Stew works blah blahbah',
    index: 5,
  },
  {
    question: 'How do I create an account?',
    answer: 'Stew works blah blahbah',
    index: 6,
  },
  {
    question: 'Can I un-share a recipe?',
    answer: 'Stew works blah blahbah',
    index: 7,
  },
  {
    question: 'How do I add a shared recipe?',
    answer: 'Stew works blah blahbah',
    index: 8,
  },
  {
    question: 'What are the benefits of using Stew?',
    answer: 'Stew works blah blahbah',
    index: 9,
  },
  {
    question: 'What are the benefits of using Stew?',
    answer: 'Stew works blah blahbah',
    index: 10,
  }
]

const FAQ = () => {
  
  const [isCollapsed, setIsCollapsed] = useState({ 
    0: true,
    1: true,
    2: true,
    3: true, 
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
  })

  function toggleCollapsed(index) {
    isCollapsed[index] = !isCollapsed[index]
    setIsCollapsed({ ...isCollapsed })
  }

  return(
    <Layout>
      <Head>
        <title>stew | FAQ </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | FAQ" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Content>
        <div className='faq__intro'>
          <Intro 
            slogan="Frequently Asked Questions"
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