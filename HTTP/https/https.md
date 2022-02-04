## 2.1 创建私钥

```bash
openssl genrsa -out privatekey.pem 2048
```

## 2.2 创建证书签名请求

```bash
openssl req -new -key privatekey.pem -out certrequest.csr
```

## 2.3 获取证书，线上证书需要经过证书授权中心签名的文件，下面只创建一个学习使用的证书

```bash
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

## 2.4 创建 pfx 证书

```bash
openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx
```
