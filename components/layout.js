import React from 'react'
import { Container, Divider, Grid } from 'semantic-ui-react'
import Head from 'next/head'
import Header from './Header'

export default (props) => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />

      {props.children}
      {/* <h1>Footer</h1> */}
      <Divider></Divider>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <p>Made With ❤️</p>
            </Grid.Column>
            <Grid.Column width={1}>
              <a href="#" class="fa fa-facebook"></a>
              <a href="#" class="fa fa-twitter"></a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  )
}
