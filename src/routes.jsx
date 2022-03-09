import { lazy } from 'react';
const DataTable = lazy(() => import('main/DataTable/DataTable'));
const DetailsRecord = lazy(() => import('main/DataTable/components/DetailsRecord'));
const BarChart = lazy(() => import('main/BarChart/BarChart'));
const TextEditor = lazy(() => import('main/TextEditor/TextEditor'));
const ImageAndGraphHeader = lazy(() => import('common/ImageAndGraphHeader/ImageAndGraphHeader'));

export const routes = [
  {
    path: '/',
    element: DataTable,
    title: 'DataTable',
  },
  {
    path: '/DetailsRecord',
    element: DetailsRecord,
    title: 'DetailsRecord',
  },
  {
    path: '/BarChart',
    element: BarChart,
    title: 'BarChart ',
  },
  {
    path: '/TextEditor',
    element: TextEditor,
    title: 'TextEditor ',
  },
  {
    path: '/Task_2',
    element: ImageAndGraphHeader,
    title: 'ImageAndGraphHeader ',
  },
  {
    path: '*',
    element: () => {
      return <div>Page Not Found</div>;
    },
  },
];
