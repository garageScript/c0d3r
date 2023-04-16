export const USER_INFO = `
    query userInfo($username: String!) {
    userInfo(username: $username) {
        user {
            discordUserId
        }
    }
}
`;
