import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import type { SortingState } from '@tanstack/react-table'
import { DataTable } from '#/components/ui/data-table'
import * as Button from '#/components/ui/button'
import { UserService } from '../service/user-serivce'
import { getUserColumnDef, getUserSortQuery } from '../ui/user-col-def'
import { ListUserFilter, type UserFilterParams } from './ListUserFilter'

const userService = new UserService()

export function ListUserComponent() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }])
    const [filter, setFilter] = useState<UserFilterParams>({})
    const [debouncedFilter, setDebouncedFilter] = useState<UserFilterParams>({})

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(filter)
            setPagination(prev => ({ ...prev, pageIndex: 0 }))
        }, 500)

        return () => clearTimeout(timer)
    }, [filter])

    const columns = useMemo(() => getUserColumnDef(), [])
    const sortParam = useMemo(() => getUserSortQuery(sorting), [sorting])

    const { data, isLoading } = useQuery({
        queryKey: ['users', pagination.pageIndex, pagination.pageSize, debouncedFilter, sortParam],
        queryFn: () => userService.getList({
            page: pagination.pageIndex,
            size: pagination.pageSize,
            sort: sortParam,
            'name:ct': debouncedFilter['name:ct'] || undefined,
            'email:ct': debouncedFilter['email:ct'] || undefined,
            'phoneNumber:ct': debouncedFilter['phoneNumber:ct'] || undefined,
            isActive: debouncedFilter.isActive !== undefined ? debouncedFilter.isActive : undefined,
        }),
    })

    const handleClearFilter = () => {
        setFilter({})
        setPagination(prev => ({ ...prev, pageIndex: 0 }))
    }

    const pageCount = data?.total
        ? Math.ceil(data.total / pagination.pageSize)
        : data?.nextPageToken ? pagination.pageIndex + 2 : pagination.pageIndex + 1

    return (
        <div className="space-y-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-title-h5 font-bold tracking-tight text-text-strong-950 dark:text-static-white">
                        Quan ly nguoi dung
                    </h1>
                    <p className="mt-1 text-paragraph-sm text-text-sub-600 dark:text-text-soft-400">
                        Xem va quan ly danh sach tai khoan nguoi dung trong he thong.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <ListUserFilter
                        filter={filter}
                        onChangeFilter={setFilter}
                        onClearFilter={handleClearFilter}
                    />
                    <Button.Root variant="primary" mode="filled">
                        <Link to="/admin/users/create">
                            Them nguoi dung
                        </Link>
                    </Button.Root>
                </div>
            </div>

            <div className="overflow-hidden rounded-24 border border-stroke-soft-200 bg-bg-white-0 shadow-regular-sm dark:border-stroke-sub-300 dark:bg-bg-weak-50">
                <DataTable
                    columns={columns}
                    data={data?.results || []}
                    pageCount={pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
