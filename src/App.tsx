import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

// Home and About are the two designed pages and ship in the main bundle; everything else is split.
const CollectionPage = lazy(() => import('./pages/CollectionPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const BrandsPage = lazy(() => import('./pages/BrandsPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const GaitAnalysisPage = lazy(() => import('./pages/GaitAnalysisPage'))
const InfoPage = lazy(() => import('./pages/InfoPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="shop/:slug" element={<CollectionPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="gait-analysis" element={<GaitAnalysisPage />} />
        <Route path="info/:slug" element={<InfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
