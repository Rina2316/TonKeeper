1. На компьютере должен быть установлен NodeJS
 - Ссылка на установку NodeJS https://nodejs.org/en/download/prebuilt-installer
2. Нужно скачать ngrok https://ngrok.com/download
3. После скачивания ngrok в терминале нужно прописать в терминале следующую команду ngrok config add-authtoken 2nmrsXFzVlRI3zXP4qrZpvZ5kDl_5tSvEmDMMFPTgoHnvQBQd
4. Затем в терминале внутри директории проекта пишем npm i для установки зависимостей
5. Запускаем проект командой npm run dev
6. Открываем новый терминал (старый не закрываем) и пишем ngrok http http://localhost:3000 (это позволит нам открыть защищенный хост на https). Копируем url который выведется в консоли рядом со словом Forwarding (например https://8493-168-119-119-151.ngrok-free.app)
7. Меняем этот юрл в проекте в двух файлах
 1. В core/constants/front-url
 2. В public/tonconnect-manifest.json (поля url и iconurl)
8. Открываем на мобилке ссылку на ngrok. Готово!

P.S. на мобилке должно быть установлено приложение tonkeeper и вы должны быть зарегестрированы в кошельке