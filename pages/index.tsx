import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { IArticle, IArticleFields, IMainPage, IMainPageFields } from '../contentful'
import client from '../contentful/index'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap'


export default function Home({home, articles} : {home: IMainPage, articles: IArticle[]}) {
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

        <h1 className='mt-5'>{home.fields.title}</h1>
        <div className='mb-5'>
          {documentToReactComponents(home.fields.description!)}
        </div>
        </div>
        <Container className='pt-5'>
          <Row>
            {articles.map(article => {
                return (
                  <Col sm={4} key={article.fields.slug}>
                  <Card body>
                    <CardTitle tag='h5'>
                      {article.fields.title}
                    </CardTitle>
                    <CardText>
                      {article.fields.description}
                    </CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                    <Button>
                      {article.fields.action}
                    </Button>
                    </Link>
                  </Card>
                  </Col>
                )
            })
            }
          </Row>
        </Container>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
const home = await client.getEntries<IMainPageFields>({
  content_type: 'mainPage',
  limit: 1,
})

const articleEntries = await client.getEntries<IArticleFields>({
  content_type: 'article',
  select: 'fields.title,fields.slug,fields.description,fields.action'
})

const [HomePage] = home.items;

  return {
    props: {
      title: 'My blog',
      home: HomePage,
      articles: articleEntries.items
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