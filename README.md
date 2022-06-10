## 尚未下載NodeJS
1. 到[ windows-nvm 存放庫 ](https://github.com/coreybutler/nvm-windows#installation--upgrades)下載最新版本 的nvm-setup.zip 檔案
2. 下載之後，開啟 zip 檔案，然後開啟 nvm-setup.exe 檔案。
3. 安裝程式-NVM-for-Windows安裝精靈將逐步引導您完成安裝步驟，包括選擇將同時安裝 nvm-windows 和Node.js的目錄。
4. 當安裝完成時。 開啟 PowerShell (建議以提升許可權的系統管理員許可權開啟) ，並嘗試使用 windows-nvm 列出目前已安裝的節點版本 (目前應該不會) ： `nvm ls`

>上述擷自[在 Windows 上安裝 NodeJS](https://docs.microsoft.com/zh-tw/windows/dev-environment/javascript/nodejs-on-windows)  

## 與此專案相關
1. 此專案採用Node.js版本為16.14.2(以 PowerShell 系統管理員身分執行)
```
nvm install 16.14.2
nvm use 16.14.2
```
2. 開啟git bash並前往目的資料夾將此專案clone下來

```
git clone https://github.com/Min015/Jack_Lab_Web_React.git
```
3. 使用 PowerShell 切換到已下載的專案目錄內
4. 安裝
```
npm install
```
5. 啟動

```
npm start
```
 >此為專案的前端部分，若無後端程式及資料庫，無法正常顯示屬正常現象  
