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

# HTTPS (保证密文，防止篡改)

- 给内容增加摘要，传到服务端，服务端验证摘要，再看内容是否一致 （摘要算法：SHA256）（可以根据摘要算法来辨别数据是否被篡改）

## 对称加密 （发送方和接收方都有一把共同钥匙）

- AES：128、192、256 位，CBC，PKCS7Padding，默认

## 非对称加密 （发送方和接收方都有一把钥匙，发送方拿到公钥，接收方拿到私钥）

- RSA：1024、2048、3072 位，OAEP，PKCS1Padding，默认
- 公钥加密，私钥解密
- 私钥加密，公钥解密

## 混合加密

- 对称 + 非对称
- 通过非对称加密来解决密钥传输问题
- 数据传输利用对称加密 (缺陷：不知道公钥是谁发的)

# 4. 数字证书和 CA

> 因为谁都可以发布公钥，我们需要验证对方身份。防止中间人攻击

- 当客户端访问服务器的时候，服务器会生成自己的私钥和公钥，将**公钥**传递给 CA 进行认证 （CA 机构是有自己的公钥和私钥的，他会把内容就行一个签名（直接把证书用私钥，内容太多，把证书先进行摘要，将摘要的结果用私钥加密））
- 客户端会在操作系统中 放入根证书，所以收到证书后可以进行验签（用内置的CA公钥进行解密， 可以解密出摘要） 将传递的明文进行再次摘要和我解密出来的摘要进行匹配，如果一致，那这个公钥就是合法的
