import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';

import { Navbar } from './components/Navbar/Navbar';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Reviews } from './components/Reviews/Reviews';

const Movies = lazy(() => import('./pages/Movies/Movies'));
const SingleMovie = lazy(() => import("./pages/SingleMovie/SingleMovie"))
const Cast = lazy(() => import("./components/Cast/Cast"))

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />}></Route>
          <Route path="movies/:movieId" element={<SingleMovie />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
