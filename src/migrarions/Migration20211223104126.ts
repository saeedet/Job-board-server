import { Migration } from '@mikro-orm/migrations';

export class Migration20211223104126 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `jobs` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `description` varchar(255) not null, `date` varchar(255) not null, `location` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `applicants` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `email` varchar(255) not null, `age` int(11) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `jobs_applicants` (`job_id` int(11) unsigned not null, `applicant_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `jobs_applicants` add index `jobs_applicants_job_id_index`(`job_id`);');
    this.addSql('alter table `jobs_applicants` add index `jobs_applicants_applicant_id_index`(`applicant_id`);');
    this.addSql('alter table `jobs_applicants` add primary key `jobs_applicants_pkey`(`job_id`, `applicant_id`);');

    this.addSql('alter table `jobs_applicants` add constraint `jobs_applicants_job_id_foreign` foreign key (`job_id`) references `jobs` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `jobs_applicants` add constraint `jobs_applicants_applicant_id_foreign` foreign key (`applicant_id`) references `applicants` (`id`) on update cascade on delete cascade;');
  }

}
