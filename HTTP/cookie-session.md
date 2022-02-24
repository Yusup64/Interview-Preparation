## cookie 和 session /sessionStorage /localStorage /indexDB

> cookie

- cookie 的特点：http“无状态”，可以通过浏览器添加 cookie，服务端也可以设置 cookie，每次请求都会带上 cookie（请求都携带，浪费流量） 合理设置
- 默认不能跨域，cookie 存在前端（安全问题）

> session

- `session`（服务器的，默认浏览器是拿不到的，session 可以放到数据原则没有上限，而且安全）基于 cookie 的
- session 默认都是存在内容里的（服务器宕机了，session 就掉了 -> 存到数据库里的，数据库也有数据丢失）

> JWT

- 根据用户信息生成的唯一令牌，每次来带上令牌很你的信息，每次都带上令牌和你的信息，用你的信息再次生成令牌做对比（不能存放敏感信息） token

> sessionStorage/localStorage/indexDB

- sessionStorage浏览器关掉自动被清理
- localStorage浏览器关掉了不会被清理
- indexDB 数据库，可以存储大量数据，但是不能存放敏感信息



