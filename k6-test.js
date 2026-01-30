import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('http://localhost:3000');
  check(res, {
    'status is 200 or 404': (r) => r.status === 200 || r.status === 404
  });
}
