import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'

import styles from './index.module.scss'
import Error from '@components/Error'
import PageLoading from '@components/PageLoading'
import Header from './Header'
import Preview from '../preview'
import Editor from '../editor'
import Entry from '../entry'
import ToolBox from '@components/tool-box'
import { LoginPage } from '../login/index';
import { WechatScanLogin } from '../login/wechat-scan';
import { Register } from '../login/register';
import { ForgetPwdPage } from '../login/forget-pwd';
import '../login/index.scss'

function Home() {
    return (
        <Layout>
            <Layout>
                <Layout.Content className={styles.content}>
                    <Suspense fallback={<PageLoading />}>
                        <Routes>
                            <Route path='/preview' element={<Preview />}></Route>
                            <Route path='/signin' element={<LoginPage />}></Route>
                            <Route path='/wechat' element={<WechatScanLogin />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                            <Route path='/forget' element={<ForgetPwdPage />}></Route>
                            <Route path='/' element={<Entry />}></Route>
                        </Routes>
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Home
