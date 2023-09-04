import {useAuthState} from "../hooks/useAuthState"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from "../components/layout"
import MainPage from "./mainPage"
import CategoryPage from "./categoryPage"
import ProductPage from "./productPage"
import Page404 from "./page404"
import ScrollToTop from "../utils/scrollToTop"
import Loader from "../components/ui/loader"

import AdminLoginPage from "./adminLoginPage"
import AdminPanelLayout from "../components/adminPanelLayout"
import ProtectedRoute from "../components/protectedRoute"
import AdminCategoriesPage from "./adminCategoriesPage"
import AdminProductsPage from "./adminProductsPage"
import AdminCreateProductPage from "./adminCreateProductPage"
import AdminOrdersPage from "./adminOrdersPage"
import AdminQuestionsPage from "./adminQuestionsPage"
import AdminOtherwisePage from "./adminOtherwisePage"

const Pages = () => {
    const {userState, loading} = useAuthState()

    const privateRoutes = [
        {path: '/admin/panel', Component: AdminCategoriesPage, redirectPath: '/admin/login'},
        {path: '/admin/panel/с/:categoryId', Component: AdminProductsPage, redirectPath: '/admin/login'},
        {path: '/admin/panel/c/:categoryId/create-product', Component: AdminCreateProductPage, redirectPath: '/admin/login'},
        {path: '/admin/panel/c/:categoryId/edit-product/:productId', Component: AdminCreateProductPage, redirectPath: '/admin/login'},
        {path: '/admin/otherwise', Component: AdminOtherwisePage, redirectPath: '/admin/login'},
        {path: '/admin/orders', Component: AdminOrdersPage, redirectPath: '/admin/login'},
        {path: '/admin/questions', Component: AdminQuestionsPage, redirectPath: '/admin/login'}
    ]

    if (loading) return <Loader/>

    return (
        <BrowserRouter>
            <Layout>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/c/:categoryId" element={<CategoryPage/>}/>
                    <Route path="/c/:categoryId/:productId" element={<ProductPage/>}/>
                    <Route path="/c/:categoryId/:productId/characteristics" element={<ProductPage characteristics={true}/>}/>
                    <Route path="/admin/login" element={<AdminLoginPage/>}/>
                    {privateRoutes.map(({path, redirectPath, Component}) => {
                        return (
                            <Route key={path} path={path} element={
                                    <ProtectedRoute isAllowed={userState} redirectPath={redirectPath} >
                                        <AdminPanelLayout>
                                            <Component/>
                                        </AdminPanelLayout>
                                    </ProtectedRoute>
                                }
                            />
                        )
                    })}
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default Pages