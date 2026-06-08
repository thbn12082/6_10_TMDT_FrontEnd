import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { UsersDto } from '../dto'

export const getUserSortQuery = (sorting: SortingState): string => {
    if (!sorting || sorting.length === 0) return 'id,desc'
    return sorting.map(sort => `${sort.id},${sort.desc ? 'desc' : 'asc'}`).join(',')
}

export const getUserColumnDef = (): ColumnDef<UsersDto>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => <span className="font-medium text-text-sub-600">#{info.getValue() as number}</span>,
        enableSorting: true,
    },
    {
        accessorKey: 'fullName',
        header: 'Ho ten',
        cell: (info) => <span className="font-semibold text-text-strong-950">{info.getValue() as string}</span>,
        enableSorting: true,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => <span className="text-text-sub-600">{(info.getValue() as string) || '-'}</span>,
        enableSorting: true,
    },
    {
        accessorKey: 'phoneNumber',
        header: 'So dien thoai',
        cell: (info) => <span className="text-text-sub-600">{(info.getValue() as string) || '-'}</span>,
        enableSorting: true,
    },
    {
        accessorKey: 'gender',
        header: 'Gioi tinh',
        cell: (info) => {
            const gender = info.getValue() as string | undefined
            if (gender === 'MALE') return <span>Nam</span>
            if (gender === 'FEMALE') return <span>Nu</span>
            return <span className="text-text-soft-400">-</span>
        },
        enableSorting: true,
    },
    {
        accessorKey: 'roles',
        header: 'Vai tro',
        cell: (info) => {
            const roles = info.getValue() as string[] | undefined
            return <span className="text-text-sub-600">{roles?.length ? roles.join(', ') : '-'}</span>
        },
        enableSorting: false,
    },
    {
        accessorKey: 'isActive',
        header: 'Trang thai',
        cell: (info) => {
            const isActive = info.getValue() as number
            return (
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-label-xs font-semibold ${
                    isActive
                        ? 'bg-success-lighter text-success-darker dark:bg-success-alpha-10 dark:text-success-base'
                        : 'bg-error-lighter text-error-darker dark:bg-error-alpha-10 dark:text-error-base'
                }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-success-base' : 'bg-error-base'}`} />
                    {isActive ? 'Hoat dong' : 'Khong hoat dong'}
                </div>
            )
        },
        enableSorting: true,
    },
]
