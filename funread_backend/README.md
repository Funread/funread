# Development Branch

1. Create your branch from this branch with command `git checkout -b <your-name>`.

2. Work on your branch and commit your work using (Phase Begin)
```
git add <filename>
git commit -m "<update/fix/chore>: <verb> <something>"
```

3. Push update to your branch
```
git push origin <your-branch>
```

4. Create merge request from `<your branch>` to `<development>` on GitHub

5. Merge request if there is no merge conflict. Otherwise invite your teammate to review change.

6. When each phase ends, one of your team member creates merge request from `development` to `main`.

7. After all your teammates and I agree, update `main` branch by approving the merge request. (Phase End)

8. When each new phase begins, run `git pull origin development` on your local branch to work on the latest version.
