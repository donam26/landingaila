# Hướng dẫn cài đặt Font UTM Avo

## Cách 1: Tải font UTM Avo
1. Tải font UTM Avo từ nguồn chính thức
2. Đặt các file font vào thư mục `fonts/`:
   - `UTM-Avo.woff2`
   - `UTM-Avo.woff` 
   - `UTM-Avo.ttf`
   - `UTM-Avo-Bold.woff2`
   - `UTM-Avo-Bold.woff`
   - `UTM-Avo-Bold.ttf`

## Cách 2: Sử dụng CDN (nếu có)
Thêm vào `<head>` của index.html:
```html
<link href="URL_CDN_UTM_AVO" rel="stylesheet">
```

## Cấu trúc thư mục cần thiết:
```
landingaila/
├── fonts/
│   ├── UTM-Avo.woff2
│   ├── UTM-Avo.woff
│   ├── UTM-Avo.ttf
│   ├── UTM-Avo-Bold.woff2
│   ├── UTM-Avo-Bold.woff
│   └── UTM-Avo-Bold.ttf
├── index.html
├── styles.css
└── ...
```

## Lưu ý:
- Font UTM Avo đã được khai báo trong styles.css
- Nếu không có file font, hệ thống sẽ fallback sang Nunito
- Đảm bảo có quyền sử dụng font UTM Avo
