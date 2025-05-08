Plugins Vendcord How to display usernames and nicks and id

I took the Vencord plugin called ShowMeYourName and added the discord ID to it, alongside the different layouts with the new options.

Here is the piece of code with the different options that I added with the one that was already present
-
            { label: "Username then nickname and id", value: "user-nick-id", default: true },
            { label: "Nickname then username and id", value: "nick-user-id" },
            { label: "Id then username and nickname", value: "id-user-nick", default: true },
            { label: "Id then nickname and username", value: "id-nick-user" },
            { label: "Username then id and nickname", value: "user-id-nick", default: true },
            { label: "Nickname then id and username", value: "nick-id-user" },
            { label: "Username then nickname", value: "user-nick", default: true },
            { label: "Nickname then username", value: "nick-user" },
            { label: "Username then id", value: "user-id", default: true },
            { label: "Id then username", value: "id-user" },
            { label: "Username only", value: "user" },
-

![example](https://github.com/user-attachments/assets/cfff6c92-b3f5-4f71-8f5c-c8fabaac6c26)
![presentation1](https://github.com/user-attachments/assets/76dc5787-59de-4f2f-87ad-c3c786d17c40)
![presentation2](https://github.com/user-attachments/assets/51fd6086-1800-4237-b84e-32a3bb0fca99)
