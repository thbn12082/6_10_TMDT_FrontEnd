import { createFileRoute } from '@tanstack/react-router'
import { CreateUserComponent } from '#/module/users/component/CreateUserComponent'

export const Route = createFileRoute('/admin/users/create')({
    component: CreateUserComponent,
})
