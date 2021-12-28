import { Migration } from '@mikro-orm/migrations';

export class Migration20211227095039 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` add `token_version` int(11) not null default 0;');

    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');

    this.addSql('alter table `applicants` add unique `applicants_email_unique`(`email`);');
  }

}
