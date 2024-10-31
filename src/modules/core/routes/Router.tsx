import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Paths } from './paths';
import { RootLayout } from '@/modules/core/layout/Root.layout';

const LazyPodcasts = lazy(
  () => import(/*webpackChunkName: "LazyPodcasts"  */ '@/modules/podcasts'),
);

export const Router = createBrowserRouter([
  {
    path: Paths.base,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <LazyPodcasts />
          </Suspense>
        ),
      },
    ],
  },
]);
