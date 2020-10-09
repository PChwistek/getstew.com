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
    question: 'Why doesn\'t Stew show up in Chrome when it\'s installed?',
    answer: 'On Chrome, make sure you\'ve pinned the extension. Click on the puzzle piece, find Stew, and make sure the pin icon is blue.',
    index: 1,
  },
  {
    question: 'What is Stew?',
    answer: 'Stew is a browser extension that allows users to save multiple tabs and windows to launch later. It also allows you to share these configurations with others via URL.',
    index: 2,
  },
  {
    question: 'How does Stew work?',
    answer: 'Stew lives in your browser and only runs when you open the Stew extension. When live, it takes a snapshot of your current windows and tabs for you to edit, save, and share.',
    index: 3,
  },
  {
    question: 'What browsers does Stew support?',
    answer: 'Stew is currently only available on Chrome. Firefox support is in the pipeline.',
    index: 4,
  },
  {
    question: 'What is a recipe?',
    answer: 'Recipes are what Stew calls a collection of tabs and windows. They\'re meant to be used later, like a cooking recipe. You can even share your recipes.',
    index: 5,
  },
  {
    question: 'Is my browsing secure?',
    answer: 'Stew only saves the browsing information users include in recipes. All recipes are set to private by default.',
    index: 6,
  },
  {
    question: 'Does Stew sell my data?',
    answer: 'No, Stew does not sell user data.',
    index: 7,
  },
  // {
  //   question: 'How do I create an account?',
  //   answer: 'Stew works blah blahbah',
  //   index: 6,
  // },
  {
    question: 'How can I share a recipe?',
    answer: 'Whenever a user views a created recipe in the extension, there\'s a share button on the bottom bar. Once selecting share, users can copy a URL that they can share with other users.',
    index: 8,
  },
  {
    question: 'How do I add a shared recipe?',
    answer: 'If you\'re logged into the Stew web app, you can click "add to library." This action will automatically add the recipe to your extension.',
    index: 9,
  },
  {
    question: 'Who uses Stew?',
    answer: 'Stew is used by teams, students, writers, and basically anyone who completes work in the browser.',
    index: 10,
  },
  {
    question: 'What are the benefits of using Stew?',
    answer: 'Stew makes it easy for you to re-use browser-based workspaces. This can not only save you time, but can also make it easier for you to concentrate on your work as you minimize the cost of task-switching.',
    index: 11,
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
    11: true,
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