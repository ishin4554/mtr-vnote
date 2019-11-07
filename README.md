![封面照片](https://i.imgur.com/sq8Lr9t.png)
協助管理線上影音課程筆記的最佳幫手

[ Demo 網址]()

## 簡介
此為 React + Express + Mongoose 的練習專案，以下為主要功能：

1. 以影片時間為基礎的留言筆記
2. 管理課程影片（CRUD）
3. 課程共筆
4. 匯出筆記

## 使用技術
### 前端
* React 
* Redux 
* Redux-Observable 
* API 
* RWD
* Sass
* Webpack 
* ES6
* D3.js 

### 後端
* Express 
* Mongoose 
* RESTiful API 
* jwt 

### 測試部署
* Jest 
* ESlint

### 使用的 Plugin 
* react-transition-group
* react-router-dom

## 前端介紹
課程管理首頁，顯示自己創建的課程與共筆課程
![]()
使用者資訊管理
![]()
課程筆記頁面
![]()
留言管理，可以進行不同的排序、篩選與搜尋
![]()
可以針對排序後的留言匯出 markdown 
![]()
課程資訊管理，設定共筆對象
![]()

## 後端介紹
 /api

#### Comment 
|description|method|url|params
|:----|:----|:----|:----|
取得所有留言 | GET | /comments | userId 取得特定使用者留言
新增留言 | POST | /comments | userId 新增該使用者留言
修改留言 | PATCH | /comments/:id | 
刪除留言 | DELETE | /comments/:id | 

#### Course 
|description|method|url|params
|:----|:----|:----|:----|
取得所有課程 | GET | /courses | userId 取得特定使用者留言
取得特定課程 | GET | /courses/:id | 
新增課程 | POST | /courses | 
修改課程 | PATCH | /courses/:id | 
刪除課程 | DELETE | /courses/:id | 

#### User 
|description|method|url|params
|:----|:----|:----|:----|
登入 | POST | /login | 
註冊 | POST | /register | 
取得使用者資訊 | GET | /users/:id | 
修改使用者資訊 | PATCH | /users/:id | 

### 資料庫

#### Comment
|column| description| type |
|:----|:----|:----|:----|
id | 留言 id | Number
content | 留言內容 | String | 
createdAt | 創建時間 | Date | 
updateAt | 更新時間 | Date |
time | 影片時間 | Number | 
courseId | 影片 id | Number | 
userId | 使用者 id | Number | 
category | 留言類型 | String | 
parentId | 母留言 id | Number | 


#### Course
|column| description| type |
|:----|:----|:----|:----|
id | 留言 id | Number
url | 影片連結 | String | 
createdAt | 創建時間 | Date | 
updateAt | 更新時間 | Date |
description | 影片敘述 | String | 
title | 影片名稱 | String | 
userId | 使用者 id | Number | 
shareList | 共享 id | Array | 
parentId | 母留言 id | Number | 

#### User
|column| description| type |
|:----|:----|:----|:----|
id | 留言 id | Number
nickname | 暱稱 | String | 
email | 帳號 | String | 
password | hash 密碼 | String |
url | 頭像連結 | String | 
createdAt | 創建時間 | Date | 
updateAt | 更新時間 | Date |