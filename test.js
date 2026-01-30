import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },   // Load testing
    { duration: '30s', target: 200 },  // Stress testing
    { duration: '10s', target: 500 },  // Spike testing
    { duration: '2m', target: 100 },   // Soak testing
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/api/reservas', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2FjZmZkYzc3MmMyYjIyMDEwNzJkMiIsImlhdCI6MTc2OTc0NjExMSwiZXhwIjoxNzY5NzQ5NzExfQ.iuon0pu81LljGkwSANFvhrpXig0exGR3mlx9lsblny4',
    },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}