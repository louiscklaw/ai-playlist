#!/usr/bin/env python
import os, sys

temp_email = ""
temp_frontmatter = ""
temp_gpt_pick_youtube = ""

with open("./_output/gpt_frontmatter.md", "r") as f_frontmatter:
    temp_frontmatter = "".join(f_frontmatter.readlines())

with open("./_output/gpt_email.md", "r") as f_gpt_email:
    temp_email = "".join(f_gpt_email.readlines())

with open("./_output/gpt_pick_youtube.md", "r") as f_pick_youtube:
    temp_gpt_pick_youtube = "".join(f_pick_youtube.readlines())

with open("./_output/page.md", "r+") as f_page:
    f_page.truncate(0)
    f_page.writelines(
        temp_frontmatter + "\n" + temp_email + "\n" + temp_gpt_pick_youtube
    )

print("done")
