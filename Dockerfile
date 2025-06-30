# 1. Base image
FROM node:18-alpine

# 2. Çalışma dizini
WORKDIR /app

# 3. Paket dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm dosyaları kopyala
COPY . .

# 6. Build işlemi
RUN npm run build

# 7. 3001 portunu expose et
EXPOSE 3001

# 8. Başlatma komutu
CMD ["npm", "run", "start"]
