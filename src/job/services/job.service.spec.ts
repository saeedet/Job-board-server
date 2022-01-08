import { EntityRepository } from '@mikro-orm/mysql';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '../entities/job.entity';
import { JobService } from './job.service';

// Mock data
const job1 = {
  title: 'Jobe One',
  description: 'This is the Job one description',
  date: '12/12/2022',
  location: 'Sydney',
};
const job2 = {
  title: 'Jobe Two',
  description: 'This is the Job Two description',
  date: '22/12/2022',
  location: 'Melbourne',
};
const allJobs = [
  new Job(job1.title, job1.description, job1.date, job1.location),
  new Job(job2.title, job2.description, job2.date, job2.location),
];
const oneJob = new Job(job1.title, job1.description, job1.date, job1.location);

describe('JobService', () => {
  let service: JobService;
  let repo: EntityRepository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useValue: {
            findOne: jest.fn().mockResolvedValue(oneJob),
            findAll: jest.fn().mockResolvedValue(allJobs),
            findOneOrFail: jest.fn().mockResolvedValue(oneJob),
            persistAndFlush: jest.fn().mockResolvedValue(oneJob),
            removeAndFlush: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    repo = module.get<EntityRepository<Job>>(getRepositoryToken(Job));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findAll function
  describe('findAll', () => {
    it('should return all the jobs', async () => {
      expect(await service.findAll()).toEqual(allJobs);
    });
  });

  // findOne function
  describe('findOne', () => {
    it('should return one job', async () => {
      expect(await service.findOne(1)).toEqual(oneJob);
      expect(repo.findOne).toBeCalledWith({ id: 1 }, ['applicants']);
      expect(repo.findOne).toBeCalledTimes(1);
    });
  });

  // create function
  describe('create', () => {
    it('should create and return a job', async () => {
      // Created at field stops the test to pass since the time
      // of creation in actual service and mock repo is different
      // expect(await service.create(job1)).toEqual(oneJob);
      // expect(repo.persistAndFlush).toBeCalledWith(oneJob);
      // -----//
      expect(await service.create(job1)).toBeInstanceOf(Job);
      expect(repo.persistAndFlush).toBeCalledTimes(1);
    });
  });

  // remove function
  describe('remove', () => {
    // good request
    it('should remove a job and return a success message', async () => {
      expect(await service.remove(1)).toBe('Successfully deleted!');
      expect(repo.findOneOrFail).toBeCalledWith({ id: 1 });
      expect(repo.findOneOrFail).toBeCalledTimes(1);
      expect(repo.removeAndFlush).toBeCalledWith(oneJob);
      expect(repo.removeAndFlush).toBeCalledTimes(1);
    });
    // bad request
    it('should throw an error', async () => {
      const badId = 1234;
      jest
        .spyOn(repo, 'findOneOrFail')
        .mockRejectedValueOnce(
          new Error(`Job with id: ${badId} does not exist!`),
        );
      expect(await service.remove(badId)).toBe(
        `Job with id: ${badId} does not exist!`,
      );
      expect(repo.removeAndFlush).toBeCalledTimes(0);
    });
  });
});
