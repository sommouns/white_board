import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'

import styles from './index.module.scss'
import Error from '@components/Error'
import PageLoading from '@components/PageLoading'
import Header from './Header'
import Preview from '../preview'
import Editor from '../editor'
import ToolBox from '@components/tool-box'

function Home() {
    return (
        <Layout>
            <Layout>
                <Layout.Content className={styles.content}>
                    <Suspense fallback={<PageLoading />}>
                        <Routes>
                            <Route path='/aa' element={<Preview />}></Route>
                            <Route path='/bb' element={<Editor />}></Route>
                            <Route path='/cc' element={<ToolBox />}></Route>
                            {/* <Route path="*" element={<Error />} /> */}
                        </Routes>
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Home
