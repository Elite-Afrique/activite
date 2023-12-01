/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : '',
        subtitle: '',
        type    : 'group',
        icon    : '',
        children: [
            {
                id   : 'pages.activities',
                title: 'Tableau de bord',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/dashboards/dashboard'
            },
            {
                id   : 'pages.activities',
                title: 'Mon programme',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/dashboard1'
            },
            {
                id   : 'apps.notes',
                title: 'Mes besoins',
                type : 'basic',
                icon : 'heroicons_outline:pencil-alt',
                link : '/dashboards/besoin'
            },
            {
                id   : 'documentation.guides',
                title: 'Documents',
                type : 'basic',
                icon : 'heroicons_outline:book-open',
                link : '/dashboards/document'
            }
        ]
    },
];