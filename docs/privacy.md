# Umbra 隐私政策

生效日期：2026年9月30日

本政策说明 Umbra 浏览器扩展（划词翻译与全文翻译）如何处理信息。Umbra 不运营模型服务。翻译由你在设置里填写的接口完成。

## 开发者不收集的信息

扩展开发者不接收、不存储、不出售以下内容：

- 你选中或翻译的网页文字，以及返回的译文
- 你的 API Key
- 浏览历史、账号或使用统计

扩展没有 Umbra 账号，也不含分析或广告组件。

## 保存在你浏览器里的信息

设置保存在本机的 `chrome.storage.local` 中，包括：服务商、Base URL、API Key、模型名称、目标语言，以及「选中立即翻译」「流式输出」两个开关。

这些数据不会上传给扩展开发者。卸载扩展后，浏览器会删除这份本地数据。

## 会离开浏览器的信息

只有在你发起翻译时，对应文字才会离开浏览器：

- 点击划词工具条上的翻译或「翻译为」
- 使用右键菜单或弹窗翻译选中文本、翻译整个网页
- 开启「选中立即翻译」后，松开鼠标时自动翻译选中文本

发送的内容是：要翻译的文字、目标语言，以及一条只说明翻译要求的系统提示。请求由扩展的后台脚本发往你填写的 Base URL，并在请求头中附上你自己的 API Key。全文翻译发送的是页面上可见的文本片段，不是整页的隐藏源码。

选择 OpenRouter 时，设置页会向 `https://openrouter.ai/api/v1/models` 请求公开的模型列表。该请求不附带 API Key，也不附带网页内容。

Ollama 的默认地址是你的电脑（`http://localhost:11434/v1`）。只要你不把它改成外部地址，翻译内容就不会离开这台电脑。

内容脚本会在你访问的网页上运行，用来显示划词工具条，并在你翻译时读取对应文字。打开网页本身不会把页面内容发出去。

## 第三方

收到译文请求的是你选择的服务商，例如 OpenAI、DeepSeek、Moonshot、智谱、阿里云百炼、OpenRouter，或你自定义的地址。他们如何保存和使用这些内容，以其自己的隐私政策为准。扩展开发者无法控制这些服务商。

## 儿童

Umbra 不面向儿童，也不会明知地收集儿童的个人信息。

## 政策变更

若数据处理方式改变，会更新本页并修改上方的生效日期。

## 联系

https://x.com/xuyidev

---

# Umbra Privacy Policy

Effective date: 30 September 2026

This policy describes how the Umbra browser extension (selection and full-page translation) handles information. Umbra does not operate a model service. Translation is performed by the endpoint you enter in Settings.

## What the developer does not collect

The extension developer does not receive, store, or sell:

- text you select or translate, or the translation returned
- your API key
- browsing history, an account, or usage analytics

There is no Umbra account, and the extension contains no analytics or advertising component.

## What stays in your browser

Settings are stored locally in `chrome.storage.local`: provider, base URL, API key, model name, target language, and the “translate on select” and “streaming” switches.

This data is not uploaded to the extension developer. Uninstalling the extension removes it.

## What leaves your browser

Text leaves your browser only when you translate:

- you use Translate or Translate-to on the selection toolbar
- you use the context menu or popup to translate a selection or the whole page
- “Translate on select” is on, and you release the mouse after selecting text

The request contains the text to translate, the target language, and a system instruction that only asks for a translation. The extension service worker sends it to the base URL you configured, with your own API key in the request header. Full-page translation sends visible text segments, not the page’s hidden source.

When OpenRouter is selected, the options page requests the public model list at `https://openrouter.ai/api/v1/models`. That request includes neither your API key nor page content.

Ollama’s default address is your computer (`http://localhost:11434/v1`). Translation stays on that computer unless you change the address to an external server.

A content script runs on pages you visit so the selection toolbar can appear and the text you choose to translate can be read. Opening a page does not by itself send page content anywhere.

## Third parties

The recipient of a translation request is the provider you choose, such as OpenAI, DeepSeek, Moonshot, Zhipu, Alibaba Cloud Model Studio, OpenRouter, or a custom endpoint. How they retain and use that content is governed by their own privacy policy. The extension developer does not control those providers.

## Children

Umbra is not directed at children and does not knowingly collect personal information from children.

## Changes

If the way data is handled changes, this page will be updated and the effective date above will change.

## Contact

https://x.com/xuyidev
