/**
 * prefer composition than inheritance
 */

interface WebPage {
  getContent(): void;
}

interface Theme {
  getColor(): string;
}

class About implements WebPage {
  private theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent(): void {
    console.log('About Page', this.theme.getColor());
  }
}

class Home implements WebPage {
  private theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent(): void {
    console.log('Home Page', this.theme.getColor());
  }
}

class Careers implements WebPage {
  private theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent(): void {
    console.log('Careers Page', this.theme.getColor());
  }
}

class BlackTheme implements Theme {
  getColor(): string {
    return 'Black';
  }
}

class WhiteTheme implements Theme {
  getColor(): string {
    return 'White';
  }
}

const whiteTheme = new WhiteTheme();
const blackTheme = new BlackTheme();

new Home(whiteTheme).getContent();
new About(whiteTheme).getContent();
new Careers(blackTheme).getContent();
