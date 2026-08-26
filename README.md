# teamwork_shuangdun
用于团队的大创项目共建

## 开发协作

> 仓库里的刻符图片（`public/dataset/`、`public/dataset_grids/`）使用 Git LFS 存储，克隆前需先安装 git-lfs，否则图片会加载不了。

1. 安装 Git LFS 并克隆仓库：

   ```bash
   git lfs install          # 首次需先从 https://git-lfs.com 下载安装 Git LFS
   git clone https://github.com/HaoMoonCel/teamwork_shuangdun.git
   cd teamwork_shuangdun
   git lfs pull             # 拉取刻符图片真图
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
