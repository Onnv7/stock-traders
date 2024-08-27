## MÔ HÌNH HỆ THỐNG
#### 1. Backend:
- `stock-fetch-svc`: gọi API từ server để lấy dữ liệu chứng khoáng
- `stock-processing-svc`: thực hiện xử lý các dữ liệu chứng khoáng từ `stock-fetch-svc` như lưu dữ liệu stock mới, lưu các lịch sử thay đổi của stock.
- `stock-socket-svc`: nhận dữ liệu những cổ phiếu có thay đổi từ `stock-processing-svc` và phát socket cho client cập nhật dữ liệu.
- `api-gateway`: là nơi để client tương tác với microservices
#### 2 Frontend:
- `stock-tracking-web`: sử dụng ReactJS để build giao diện, Socket.io để nhận dữ liệu thời gian thực
## CÁCH CÀI ĐẶT
### Cách 1:
#### 1. Cài đặt môi trường
- Clone dự án bằng lệnh `git clone`
- Chạy docker-compose để cài đặt Kafka, Zookeeper bằng lệnh `docker-compose up -d`
#### 1. Chạy Backend
- Vào từng thư mục của microservice và tải các packages bằng lệnh `npm i` và `npm run start:dev`
- Truy cập vào http://localhost:3000/swagger để xem tài liệu về API của hệ thống
#### 2. Chạy Frontend
- Thực hiện lệnh `yarn install` để cài các packages và `yarn dev`để khởi chạy frontend
- Truy cập http://localhost:3006 để vào trang dashboard
### Cách 2
- Chạy file docker-compose.yaml để build dự án đã push trên Dockerhub bằng lệnh `docker compose up -d`
- Truy cập vào http://localhost:8080/swagger để xem tài liệu API
- Truy cập vào http://localhost:3009/ để vào trang dashboard