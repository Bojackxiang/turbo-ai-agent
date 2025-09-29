/_ text-primary 颜色解析 _/

/_ Light 模式下 _/
text-primary → color: hsl(0 0% 9%) → 接近黑色的深灰色 (#171717)

/_ Dark 模式下 _/
text-primary → color: hsl(0 0% 98%) → 接近白色的浅灰色 (#FAFAFA)

/_ 使用场景 _/

- text-primary: 主要文字颜色，会根据明暗主题自动切换
- text-primary-foreground: 与 primary 背景搭配的前景色
- bg-primary: 主要背景色
- bg-primary-foreground: 与 primary 文字搭配的背景色

/_ HSL 格式说明 _/
hsl(0 0% 9%) = hsl(色相 饱和度 亮度)

- 0: 色相 (红色)
- 0%: 饱和度 (无彩色，纯灰)
- 9%: 亮度 (很暗，接近黑色)
