import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GitHubService } from './presentation/services/github.service';
import { DiscordService } from './presentation/services/discord.service';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(async() => {
    await main();
})();

function main() {

    const app = express();
    const discordService = new DiscordService();
    const gitHubService = new GitHubService();
    const controller = new GithubController(gitHubService, discordService);

    app.use(express.json());

    app.use(GithubSha256Middleware.verifySignature);

    app.post('/api/github', controller.webhookHandler);
        


    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`);
    });

}