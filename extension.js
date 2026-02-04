class TextDocumentSymbolProvider {
	async provideDocumentSymbols(document, token) {
		let ranges = await vscode.commands.executeCommand('vscode.executeFoldingRangeProvider', document.uri) ;
		const symbols = [] ;
		const lastline = document.lineCount -1 ;
		const lastcharacter = document.lineAt(lastline).text.length ;
		ranges.forEach( range => {
				let endline = range.end + 1 ; let endcharacter = 0 ;
				if ( range.end === lastline ) { endline = range.end ; endcharacter = lastcharacter ; }
				const sectionLocation = new vscode.Location(document.uri, new vscode.Range( new vscode.Position ( range.start , 0 ) , new vscode.Position ( endline , endcharacter ) ) ) ;
				const sectionSymbol = new vscode.SymbolInformation( document.lineAt( range.start ).text.trim() , 17 , '', sectionLocation ) ;
				symbols.push(sectionSymbol) ;
    } ) ;
		return symbols ;
	}
}
exports.TextDocumentSymbolProvider = TextDocumentSymbolProvider ;
//# sourceMappingURL=docSymbolProvider.js.map

function activate(context) {
		context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider([
				{ language: 'plaintext', pattern: '**/*.{txt,text}' },
				{ language: 'plaintext', scheme: 'untitled' },
		], new TextDocumentSymbolProvider())) ;
} ;
exports.activate = activate ;

function deactivate() {} ;
exports.deactivate = deactivate ;