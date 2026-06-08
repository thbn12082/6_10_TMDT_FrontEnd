import { createFileRoute } from '@tanstack/react-router'
import { ListUserComponent } from '#/module/users/component/ListUserComponent'

export const Route = createFileRoute('/admin/users/')({
    component: ListUserComponent,
})
