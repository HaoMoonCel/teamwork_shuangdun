# teamwork_shuangdun
用于团队的大创项目共建

## 开发协作

1. 克隆仓库：

   ```bash
   git clone https://github.com/HaoMoonCel/teamwork_shuangdun.git
   ```

2. 安装依赖并启动开发服务器：

   ```bash
   cd shuangdun-frontend
   npm install
   npm run dev
   ```

3. 每次提交前先拉取最新代码，避免冲突：

   ```bash
   git pull --rebase
   git add .
   git commit -m "描述你的改动"
   git push
   ```

> 需要先被添加为仓库 Collaborator（仓库页面 Settings → Collaborators → Add people）才能推送。
> 注意：`node_modules/` 和 `dist/` 已在 `.gitignore` 中，不要手动提交它们。
