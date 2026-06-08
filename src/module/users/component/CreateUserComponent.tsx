import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Save, X } from 'lucide-react'
import * as Select from '#/components/ui/select'
import type { ErrorMessage } from '#/lib/http.client'
import { useToast } from '#/lib/toast/use-toast'
import type { AbstractForm, ValidatorFunction } from '#/utils/validate-form'
import { GenderType, type CreateUserRequest } from '../dto'
import { UserService } from '../service/user-serivce'

interface CreateUserForm extends CreateUserRequest {
    confirmPassword: string
}

const userService = new UserService()

const formRules: AbstractForm<CreateUserForm> = {
    fullName: (val) => {
        if (!val) return 'Ho ten khong duoc de trong'
        if (val.length < 2) return 'Ho ten phai co it nhat 2 ky tu'
        return null
    },
    email: (val) => {
        if (!val) return 'Email khong duoc de trong'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Email khong dung dinh dang'
        return null
    },
    phoneNumber: (val) => {
        if (!val) return 'So dien thoai khong duoc de trong'
        if (!/^\d{10,11}$/.test(val)) return 'So dien thoai phai co 10-11 chu so'
        return null
    },
    address: (val) => val ? null : 'Dia chi khong duoc de trong',
    gender: () => null,
    password: (val) => {
        if (!val) return 'Mat khau khong duoc de trong'
        if (val.length < 6) return 'Mat khau phai co it nhat 6 ky tu'
        return null
    },
    confirmPassword: (val, form) => {
        if (!val) return 'Vui long xac nhan mat khau'
        if (val !== form.password) return 'Mat khau xac nhan khong khop'
        return null
    },
}

export function CreateUserComponent() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toastSuccess, toastError } = useToast()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof CreateUserForm, string>>>({})
    const [formState, setFormState] = useState<CreateUserForm>({
        fullName: '',
        gender: null,
        address: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })

    const createMutation = useMutation({
        mutationFn: (data: CreateUserRequest) => userService.create(data),
        onSuccess: () => {
            toastSuccess('Tao nguoi dung thanh cong')
            queryClient.invalidateQueries({ queryKey: ['users'] })
            navigate({ to: '/admin/users' })
        },
        onError: (error: ErrorMessage) => {
            setErrorMessage(error?.message || 'Tao nguoi dung that bai')
            toastError('Tao nguoi dung that bai')
        },
    })

    const validateAll = () => {
        let isValid = true
        const newErrors: Partial<Record<keyof CreateUserForm, string>> = {}

        for (const key in formRules) {
            const field = key as keyof CreateUserForm
            const rule = formRules[field] as ValidatorFunction<any, CreateUserForm> | undefined
            if (!rule) continue

            const error = rule(formState[field], formState)
            if (typeof error === 'string') {
                newErrors[field] = error
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }

    const handleInputChange = (field: keyof CreateUserForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
        if (errorMessage) setErrorMessage(null)
    }

    const handleGenderChange = (value: string) => {
        setFormState(prev => ({ ...prev, gender: value === 'undefined' ? null : value as keyof typeof GenderType }))
    }

    const handleSubmit = () => {
        if (!validateAll()) {
            toastError('Vui long kiem tra lai thong tin')
            return
        }

        const { confirmPassword, ...payload } = formState
        createMutation.mutate(payload)
    }

    const inputClass = (field: keyof CreateUserForm) => `
        w-full rounded-10 border px-4 py-2.5 text-paragraph-sm shadow-custom-input outline-none transition-all focus:ring-4
        ${errors[field] ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-stroke-soft-200 focus:border-primary-base focus:ring-primary-alpha-10'}
        bg-bg-white-0 dark:border-stroke-sub-300 dark:bg-bg-weak-50 dark:text-static-white
    `

    return (
        <div className="min-h-screen overflow-hidden bg-bg-weak-50 transition-colors duration-300 dark:bg-bg-white-0">
            <header className="sticky top-0 z-20 h-20 border-b border-stroke-soft-200 bg-bg-white-0/80 backdrop-blur-md dark:border-stroke-sub-300 dark:bg-bg-weak-50/80">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate({ to: '/admin/users' })}
                            className="group flex h-10 w-10 items-center justify-center rounded-10 border border-stroke-soft-200 bg-bg-white-0 text-text-sub-600 shadow-regular-sm transition-all hover:bg-bg-weak-50 active:scale-95 dark:border-stroke-sub-300 dark:bg-bg-weak-50 dark:text-text-soft-400"
                        >
                            <X size={20} className="transition-transform group-hover:rotate-90" />
                        </button>
                        <div>
                            <h1 className="text-label-md font-bold text-text-strong-950 dark:text-static-white">
                                Tao nguoi dung moi
                            </h1>
                            <span className="text-label-2xs font-medium uppercase tracking-wider text-text-soft-400">
                                Quan ly nguoi dung
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={createMutation.isPending}
                        className="flex items-center gap-2 rounded-10 bg-static-black px-6 py-2.5 text-label-sm font-semibold text-static-white shadow-fancy-buttons-neutral transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-base dark:hover:bg-blue-600 dark:shadow-fancy-buttons-primary"
                    >
                        {createMutation.isPending ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-static-white border-t-transparent" />
                        ) : (
                            <>
                                <Save size={18} />
                                Luu thay doi
                            </>
                        )}
                    </button>
                </div>
            </header>

            <main className="max-h-[calc(90vh-4rem)] overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-5xl rounded-20 bg-bg-white-0 shadow-complex dark:bg-bg-weak-50">
                    <div className="border-b border-stroke-soft-200 bg-bg-weak-25 px-6 py-4 dark:border-stroke-sub-300 dark:bg-bg-surface-800">
                        <h2 className="text-label-xs font-bold uppercase tracking-widest text-text-strong-950 dark:text-static-white">
                            Thong tin tai khoan
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Ho ten *</label>
                            <input value={formState.fullName} onChange={handleInputChange('fullName')} className={inputClass('fullName')} placeholder="Nguyen Van A" />
                            {errors.fullName && <p className="text-label-sm text-error-base">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Email *</label>
                            <input type="email" value={formState.email} onChange={handleInputChange('email')} className={inputClass('email')} placeholder="name@company.com" />
                            {errors.email && <p className="text-label-sm text-error-base">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">So dien thoai *</label>
                            <input value={formState.phoneNumber} onChange={handleInputChange('phoneNumber')} className={inputClass('phoneNumber')} placeholder="0123456789" />
                            {errors.phoneNumber && <p className="text-label-sm text-error-base">{errors.phoneNumber}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Gioi tinh</label>
                            <Select.Root value={formState.gender || 'undefined'} onValueChange={handleGenderChange}>
                                <Select.Trigger>
                                    <Select.Value placeholder="Chon gioi tinh" />
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Item value="undefined">Khong chon</Select.Item>
                                    <Select.Item value="MALE">Nam</Select.Item>
                                    <Select.Item value="FEMALE">Nu</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Dia chi *</label>
                            <input value={formState.address} onChange={handleInputChange('address')} className={inputClass('address')} placeholder="Ha Noi, Viet Nam" />
                            {errors.address && <p className="text-label-sm text-error-base">{errors.address}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Mat khau *</label>
                            <input type="password" value={formState.password} onChange={handleInputChange('password')} className={inputClass('password')} placeholder="******" />
                            {errors.password && <p className="text-label-sm text-error-base">{errors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-label-sm font-medium text-text-strong-950 dark:text-static-white">Xac nhan mat khau *</label>
                            <input type="password" value={formState.confirmPassword} onChange={handleInputChange('confirmPassword')} className={inputClass('confirmPassword')} placeholder="******" />
                            {errors.confirmPassword && <p className="text-label-sm text-error-base">{errors.confirmPassword}</p>}
                        </div>

                        {errorMessage && (
                            <div className="md:col-span-2 rounded-10 bg-red-50 p-3 text-label-sm font-medium text-error-base dark:bg-red-900/20">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
