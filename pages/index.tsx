import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { IMainPage, IMainPageFields } from '../contentful'
import client from '../contentful/index'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {Container, Row, Col} from 'reactstrap'


export default function Home({home} : {home: IMainPage}) {
console.log(home)

  return (
    <div>
      <Head>
      <title>{home.fields.title}</title>
      </Head>

      <main>
        <div
        className='text-center p-5 text-white'
        style={{
          background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
          minHeight: '300px'
        }}
        >

        </div>
        <h1 className='mt-5'>{home.fields.title}</h1>
        <div className='mb-5'>
          {documentToReactComponents(home.fields.description!)}
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
const home = await client.getEntries<IMainPageFields>({
  content_type: 'mainPage',
  limit: 1,
})

const [HomePage] = home.items;

  return {
    props: {
      title: 'My blog',
      home: HomePage,
    },
    revalidate: 3600
  }
}


// export const getServerSideProps: GetServerSideProps = async () => {
// console.log('props')

//   return {
//     props: {
//       title: 'My blog'
//     }
//   }
// }