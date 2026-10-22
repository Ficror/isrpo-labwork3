import * as vscode from 'vscode';

// Описывает найденную запись TODO: текст комментария, имя файла и номер строки
interface todo {
	task_name: string;
	file_name: string;
	line: number;
};

// Описывает найденную запись FIXME: текст комментария, имя файла и номер строки
interface fixme {
	task_name: string;
	file_name: string;
	line: number;
};

// Ищет комментарии FIXME в открытых текстовых документах VS Code.
// Возвращает массив записей с текстом комментария, именем файла и номером строки.
// Пример вызова: const fixme = get_fixme();
function get_fixme() {
	let file = vscode.workspace.textDocuments;
	let fixme_arrary: Array<fixme> = [];

	for (let i = 0; i < file.length; ++i) {
		let text: string = file[i].getText();
		let line: string = "";
		let flag = 0;
		let line_number = 1;

		for (let chr = 0; chr < text.length; chr++) {
			if (text[chr] === '\n') {
				let start = 0;
				while (line[start] === ' ' || line[start] === '\t') {
					start++;
				}
			if (flag === 1 && line[start] === '/' && line[start + 1] === '/') {
					fixme_arrary.push({
						task_name: line.slice(start + 2),
						file_name: file[i].fileName,
						line: line_number
					});
				}
				line = "";
				flag = 0;
				line_number++;
			} else {
				line += text[chr];
			}

			if (text[chr] === 'E' && text[chr - 1] === 'M' && text[chr - 2] === 'X' && text[chr - 3] === 'I' && text[chr - 4] === 'F') {
				flag = 1;
			}
		}

		let start = 0;
		while (line[start] === ' ' || line[start] === '\t') {
			start++;
		}
		if (flag === 1 && line[start] === '/' && line[start + 1] === '/') {
			fixme_arrary.push({
				task_name: line.slice(start + 2),
				file_name: file[i].fileName,
				line: line_number
			});
		}
	}

	for (let i = 0; i < fixme_arrary.length; i++) {
		console.log(fixme_arrary[i].task_name, fixme_arrary[i].line);
	}
	return fixme_arrary;
}

// Ищет комментарии TODO в открытых текстовых документах VS Code.
// Возвращает массив записей с текстом комментария, именем файла и номером строки.
// Пример вызова: const todo = get_todo();
function get_todo() {
	let file = vscode.workspace.textDocuments;
	let todo_arrary: Array<todo> = [];

	for (let i = 0; i < file.length; ++i) {
		let text: string = file[i].getText();
		let line: string = "";
		let flag = 0;
		let line_number = 1;

		for (let chr = 0; chr < text.length; chr++) {
			if (text[chr] === '\n') {
				let start = 0;
				while (line[start] === ' ' || line[start] === '\t') {
					start++;
				}
			if (flag === 1 && line[start] === '/' && line[start + 1] === '/') {
					todo_arrary.push({
						task_name: line.slice(start + 2),
						file_name: file[i].fileName,
						line: line_number
					});
				}
				line = "";
				flag = 0;
				line_number++;
			} else {
				line += text[chr];
			}

			if (text[chr] === 'O' && text[chr - 1] === 'D' && text[chr - 2] === 'O' && text[chr - 3] === 'T') {
				flag = 1;
			}
		}

		let start = 0;
		while (line[start] === ' ' || line[start] === '\t') {
			start++;
		}
		if (flag === 1 && line[start] === '/' && line[start + 1] === '/') {
			todo_arrary.push({
				task_name: line.slice(start + 2),
				file_name: file[i].fileName,
				line: line_number
			});
		}
	}

	for (let i = 0; i < todo_arrary.length; i++) {
		console.log(todo_arrary[i].task_name, todo_arrary[i].line);
	}
	return todo_arrary;
}
// Активирует расширение и регистрирует команду todo-visualize.helloWorld.
// При запуске команды ищет комментарии и показывает их в Webview-панели.
// Пример: VS Code вызывает activate(context) при активации расширения.
export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('todo-plugin.find_todo', () => {
		let todo = get_todo();
		let fixme = get_fixme();

	});
	context.subscriptions.push(disposable);
}