# MyDailyTodo
日々のタスク管理に焦点を当てたTodoListアプリです。<br />
日ごとにタスクが登録でき、タスクごとに作業時間を測ることができます。<br />
また、タスクの種類を選択することで一定期間ごとにどのタスクにどのくらいの時間がかかったかなど「ふりかえり」に便利なチャート機能も作成しました。

# アプリケーションURL
https://mydailytodoapp.zapto.org/

# このアプリケーションを作成した理由
PC向けのタスク管理ソフトは数多く存在しますが、私はそれらを使用する中で次のような不満を感じていました。「チーム向けの機能に特化している」「タスクを日付で管理できない」「見づらいテーブル形式のUI」「タスクにかかった時間を記録できない」といった点です。

そこで、これらの不満点を解決するため「直観的で簡単に日々のタスクを管理できるアプリケーション」を作ろうという思いで作成を始めました。

# 機能一覧
### Todo機能
![image](https://github.com/user-attachments/assets/6cfa6f6b-f57f-45b3-8ee3-6fef52766f7d)
TodoList画面です。<br />
画面上部にあるDataPickerで選択した日付に登録したタスクを表示することができます。

タスクはドラッグ＆ドロップで状態を変更でき、状態がInProgressの時のみタイマーをスタートできます。

#### 部分ごとの機能
| タスク種別 | タスク詳細の記載 |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/782e30d9-d784-4ff3-a689-ceab927f2e90) |![image](https://github.com/user-attachments/assets/846abc64-fd13-42e8-ab8b-903a54dbdfd8) |
| タスク上部を押下することでタスク種別を設定できます。| タスクごとにメモを取ることができます。 |

| タスク登録時のModal|
| ---- |
| ![image](https://github.com/user-attachments/assets/5caa0b05-72e2-4d83-8c7c-962ab35714ae) |
| Done状態にタスクを追加する際、時間の変更が不可のため登録時に設定できるようにしています。 |

##### Analysis機能
![image](https://github.com/user-attachments/assets/d161bc29-2c5b-4866-ba3f-ed40dace52c5)
Analysis画面です<br />
画面上部にあるDataPickerで選択した期間のタスクを集計してグラフを出す機能です。
一定期間ごとの振り返りや、未達成のタスクが残っていないかを画面で確認することができます。

# 使用技術
| カテゴリー | 技術スタック |
| ---- | ---- |
|フロントエンド|TypeScript, React, Remix, Storybook, ChakraUi|
|バックエンド|python, SQLAlchemy|
|データベース|PostgreSQL|
|環境構築| Docker|
|デザイン| Figma|

# 今後追加したい機能
- 認証・認可機能を追加して、ユーザーによって表示されるデータを分けたい
- タスク全体の検索機能を追加したい
- ゲーミフィケーションの考え方を使って、タスクを消化することを楽しくしたい
