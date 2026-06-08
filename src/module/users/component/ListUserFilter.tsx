import { FilterComponent } from '#/components/ui/filter'
import * as Input from '#/components/ui/input'
import * as Select from '#/components/ui/select'
import { RotateCcw, Search } from 'lucide-react'

export type UserFilterParams = {
    'name:ct'?: string
    'email:ct'?: string
    'phoneNumber:ct'?: string
    isActive?: number
}

export type ListUserFilterProps = {
    filter: UserFilterParams
    onChangeFilter: React.Dispatch<React.SetStateAction<UserFilterParams>>
    onClearFilter: () => void
}

export function ListUserFilter({ filter, onChangeFilter, onClearFilter }: ListUserFilterProps) {
    return (
        <FilterComponent filter={filter} onChangeFilter={onChangeFilter} onClearFilter={onClearFilter}>
            <div className="absolute right-0 top-full z-100 mt-3 w-[380px] origin-top-left animate-in fade-in zoom-in-95 duration-200">
                <section className="w-full overflow-hidden rounded-12 border border-stroke-soft-200 bg-bg-white-0 shadow-complex dark:border-stroke-sub-300 dark:bg-bg-weak-50">
                    <div className="flex w-full items-center justify-between border-b border-stroke-soft-200 bg-bg-weak-25 px-6 py-2 dark:border-stroke-sub-300 dark:bg-bg-surface-800">
                        <h2 className="text-label-md font-bold text-text-strong-950 dark:text-static-white">Bo loc tim kiem</h2>
                        <button
                            onClick={onClearFilter}
                            className="flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-1.5 text-label-xs font-semibold text-text-sub-600 transition-all hover:bg-bg-weak-50 active:scale-95 dark:border-stroke-sub-300 dark:bg-bg-weak-50 dark:text-text-soft-400"
                        >
                            <RotateCcw size={14} />
                            Dat lai
                        </button>
                    </div>

                    <div className="flex max-h-[70vh] flex-col flex-wrap items-start gap-y-6 overflow-y-auto px-4 py-4">
                        <div className="w-full">
                            <label className="mb-2.5 block text-label-xs font-semibold text-text-sub-600 dark:text-text-soft-400">
                                Ho ten
                            </label>
                            <Input.Root size="medium">
                                <Input.Wrapper>
                                    <Input.Icon as={Search} />
                                    <Input.Input
                                        placeholder="Tim theo ho ten..."
                                        value={filter['name:ct'] || ''}
                                        onChange={(e) => onChangeFilter(prev => ({ ...prev, 'name:ct': e.target.value }))}
                                    />
                                </Input.Wrapper>
                            </Input.Root>
                        </div>

                        <div className="w-full">
                            <label className="mb-2.5 block text-label-xs font-semibold text-text-sub-600 dark:text-text-soft-400">
                                Email
                            </label>
                            <Input.Root size="medium">
                                <Input.Wrapper>
                                    <Input.Icon as={Search} />
                                    <Input.Input
                                        placeholder="Tim theo email..."
                                        value={filter['email:ct'] || ''}
                                        onChange={(e) => onChangeFilter(prev => ({ ...prev, 'email:ct': e.target.value }))}
                                    />
                                </Input.Wrapper>
                            </Input.Root>
                        </div>

                        <div className="w-full">
                            <label className="mb-2.5 block text-label-xs font-semibold text-text-sub-600 dark:text-text-soft-400">
                                So dien thoai
                            </label>
                            <Input.Root size="medium">
                                <Input.Wrapper>
                                    <Input.Icon as={Search} />
                                    <Input.Input
                                        placeholder="Tim theo so dien thoai..."
                                        value={filter['phoneNumber:ct'] || ''}
                                        onChange={(e) => onChangeFilter(prev => ({ ...prev, 'phoneNumber:ct': e.target.value }))}
                                    />
                                </Input.Wrapper>
                            </Input.Root>
                        </div>

                        <div className="w-full">
                            <label className="mb-2.5 block text-label-xs font-semibold text-text-sub-600 dark:text-text-soft-400">
                                Trang thai
                            </label>
                            <Select.Root
                                value={filter.isActive !== undefined ? filter.isActive.toString() : 'undefined'}
                                onValueChange={(val) => onChangeFilter(prev => ({ ...prev, isActive: val === 'undefined' ? undefined : Number(val) }))}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Tat ca trang thai" />
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Item value="undefined">Tat ca trang thai</Select.Item>
                                    <Select.Item value="1">Hoat dong</Select.Item>
                                    <Select.Item value="0">Khong hoat dong</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>
                    </div>
                </section>
            </div>
        </FilterComponent>
    )
}
