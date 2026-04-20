# Angular Mock Base

Base code Angular nay duoc dung de code giao dien voi mock data truoc, chua ket noi API.

## Chay project

```bash
npm install
npm start
```

## Structure

- `src/app/core`: constants, models, mock data, service dung chung
- `src/app/layouts`: route shell, sidebar, topbar
- `src/app/shared`: component tai su dung
- `src/app/features`: page theo tung man hinh

## Route san co

- `/dashboard`: trang tong quan co KPI, table va activity feed mock
- `/ui-playground`: noi de rap component va test state giao dien
- `/settings`: checklist ky thuat va folder guide

## Ghi chu

- Mock data dang di qua `MockWorkspaceService`
- Neu sau nay noi API that, uu tien giu model va component input, chi doi datasource trong service
- Da co alias import: `@core`, `@shared`, `@features`, `@layouts`
# 6_10_TMDT_FrontEnd
