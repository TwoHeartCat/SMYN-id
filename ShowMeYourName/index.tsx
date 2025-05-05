/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 rini
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { definePluginSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Message, User } from "discord-types/general";

interface UsernameProps {
    author: { nick: string; };
    message: Message;
    withMentionPrefix?: boolean;
    isRepliedMessage: boolean;
    userOverride?: User;
}

const settings = definePluginSettings({
    mode: {
        type: OptionType.SELECT,
        description: "How to display usernames and nicks and id",
        options: [
            { label: "Username then nickname and id", value: "user-nick-id", default: true },
            { label: "Nickname then username and id", value: "nick-user-id" },
            { label: "Id then username and nickname", value: "id-user-nick", default: true },
            { label: "Id then nickname and username", value: "id-nick-user" },
            { label: "Username then id and nickname", value: "user-id-nick", default: true },
            { label: "Nickname then id and username", value: "nick-id-user" },
            { label: "Username then id", value: "user-id", default: true },
            { label: "Username then nickname", value: "user-nick", default: true },
            { label: "Nickname then username", value: "nick-user" },
            { label: "Id then username", value: "id-user" },
            { label: "Username only", value: "user" },
        ],
    },
    displayNames: {
        type: OptionType.BOOLEAN,
        description: "Use display names in place of usernames",
        default: false
    },
    inReplies: {
        type: OptionType.BOOLEAN,
        default: false,
        description: "Also apply functionality to reply previews",
    },
});

export default definePlugin({
    name: "ShowMeYourName",
    description: "Display usernames next to nicks and id, or no nicks and id at all",
    authors: [Devs.Rini, Devs.TheKodeToad],
    patches: [
        {
            find: '"BaseUsername"',
            replacement: {
                /* TODO: remove \i+\i once change makes it to stable */
                match: /(?<=onContextMenu:\i,children:)(?:\i\+\i|\i)/,
                replace: "$self.renderUsername(arguments[0])"
            }
        },
    ],
    settings,

    renderUsername: ErrorBoundary.wrap(({ author, message, isRepliedMessage, withMentionPrefix, userOverride }: UsernameProps) => {
        try {
            const user = userOverride ?? message.author;
            let { username, id } = user;
            if (settings.store.displayNames)
                username = (user as any).globalName || username;

            const { nick } = author;
            const prefix = withMentionPrefix ? "@" : "";

            const userIdDisplay = <span className="vc-smyn-id">{id}</span>;

            if (isRepliedMessage && !settings.store.inReplies || username.toLowerCase() === nick.toLowerCase())

                if (settings.store.mode === "user-id")
                    return <>{prefix}{username}{userIdDisplay}</>;

            if (settings.store.mode === "nick-user-id")
                return <>{prefix}{nick}<span className="vc-smyn-suffix">{username}</span>{userIdDisplay}</>;

            if (settings.store.mode === "id-user-nick")
                return <>{prefix}{userIdDisplay}{username}<span className="vc-smyn-suffix">{nick}</span></>;

            if (settings.store.mode === "id-nick-user")
                return <>{prefix}{userIdDisplay}{nick}<span className="vc-smyn-suffix">{username}</span></>;

            if (settings.store.mode === "user-id-nick")
                return <>{prefix}{username}{userIdDisplay}<span className="vc-smyn-suffix">{nick}</span></>;

            if (settings.store.mode === "nick-id-user")
                return <>{prefix}{nick}<span className="vc-smyn-suffix">{userIdDisplay}</span>{username}</>;

            if (settings.store.mode === "id-user")
                return <>{prefix}{userIdDisplay}{username}</>;

            if (settings.store.mode === "user-nick")
                return <>{prefix}{username}<span className="vc-smyn-suffix">{nick}</span>{userIdDisplay}</>;

            if (settings.store.mode === "nick-user")
                return <>{prefix}{nick}<span className="vc-smyn-suffix">{username}</span></>;

            if (settings.store.mode === "user-nick-id")
                return <>{prefix}{username}<span className="vc-smyn-suffix">{nick}</span>{userIdDisplay}</>;

            return <>{prefix}{username}{userIdDisplay}</>;
        } catch {
            return <>{author?.nick}</>;
        }
    }, { noop: true }),
});
