async (page) => {
  const results = []
  const check = (value, label) => { if (!value) throw new Error(label); results.push(label) }
  const main = page.getByRole('main')
  const states = [
    ['예약 확인', '방문이 예약되어 있습니다'],
    ['현장 접수', '현장 접수가 되었습니다'],
    ['대기', '순서를 기다리고 있습니다'],
    ['호출', '어르신의 차례를 안내했습니다'],
    ['이용 중', '서비스를 이용하고 있습니다'],
    ['마침', '서비스 이용을 마쳤습니다'],
  ]
  for (const [button, heading] of states) {
    await page.getByRole('button', { name: button, exact: true }).click()
    await main.getByRole('heading', { name: heading, exact: true }).waitFor()
    check(page.url().endsWith('#/g6'), button + ': G6 주소 유지')
    check(await main.locator('[aria-current="step"]').count() === 1, button + ': 현재 단계 한 개')
    check(await main.getByRole('heading', { name: '현장 순서 안내' }).count() === (['현장 접수', '대기', '호출'].includes(button) ? 1 : 0), button + ': 대기정보 표시 범위')
  }
  check(!(await main.innerText()).includes('알려 드렸습니다'), '완료를 알림 발송 성공으로 표시하지 않음')
  await page.getByRole('button', { name: '대기', exact: true }).click()
  await page.getByRole('spinbutton', { name: '내 번호', exact: true }).fill('80')
  await page.getByRole('spinbutton', { name: '지금 진행', exact: true }).fill('10')
  await page.getByRole('spinbutton', { name: '내 앞', exact: true }).fill('2')
  await page.getByRole('button', { name: '근거 있음 (1명당 5분)', exact: true }).click()
  await main.getByText('약 10분', { exact: true }).waitFor()
  check((await main.innerText()).includes('2명'), '번호 차이 70 대신 저장된 앞선 인원 2명 표시')
  await page.getByRole('button', { name: '근거 없음 → 알 수 없음', exact: true }).click()
  await main.getByText('아직 알 수 없습니다', { exact: true }).waitFor()
  check(!(await main.innerText()).includes('약 10분'), '근거 제거 시 이전 예측 숨김')
  await page.getByRole('spinbutton', { name: '내 앞', exact: true }).fill('-2')
  await page.getByRole('button', { name: '근거 있음 (1명당 5분)', exact: true }).click()
  await main.getByText('아직 알 수 없습니다', { exact: true }).waitFor()
  check(!(await main.innerText()).includes('-2명'), '음수 인원으로 잘못된 시간 계산 방지')
  await page.getByRole('spinbutton', { name: '내 앞', exact: true }).fill('0')
  await main.getByText('다음 차례입니다.', { exact: true }).waitFor()
  check(!(await main.innerText()).includes('약 0분'), '0명일 때 약 0분 대신 다음 차례 안내')
  await page.getByRole('button', { name: '근거 없음 → 알 수 없음', exact: true }).click()
  await main.getByText('다음 차례입니다.', { exact: true }).waitFor()
  check(true, '시간 근거가 없어도 0명일 때 다음 차례 안내')
  check((await main.getByRole('heading', { name: '순서를 기다리고 있습니다', exact: true }).count()) === 1, '0명이어도 자동 호출하지 않음')
  await page.getByRole('button', { name: '근거 있음 (1명당 5분)', exact: true }).click()
  await page.getByRole('spinbutton', { name: '내 앞', exact: true }).fill('3')
  await page.reload()
  await main.getByText('약 15분', { exact: true }).waitFor()
  check(true, '새로고침 후 저장된 방문 상태 유지')

  const elderly = await page.context().newPage()
  await elderly.goto(new URL('/#/e1', page.url()).href)
  await elderly.getByRole('button', { name: '호출', exact: true }).click()
  await main.getByRole('heading', { name: '어르신의 차례를 안내했습니다', exact: true }).waitFor()
  check(page.url().endsWith('#/g6'), '다른 탭 상태 변경 후 G6 유지')
  await elderly.waitForURL('**/#/e7')
  check(true, '기존 어르신 화면의 상태 전환 유지')
  await elderly.close()
  await page.getByRole('button', { name: '대기', exact: true }).click()
  await page.getByRole('spinbutton', { name: '내 번호', exact: true }).fill('23')
  await page.getByRole('spinbutton', { name: '지금 진행', exact: true }).fill('19')

  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 844 })
    for (const scale of [16, 32]) {
      await page.evaluate((size) => { document.documentElement.style.fontSize = size + 'px' }, scale)
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
      check(fits, width + 'px / 글자 ' + (scale === 32 ? '200%' : '100%') + ': 가로 넘침 없음')
      check(await main.getByRole('heading', { name: '방문 정보', exact: true }).count() === 1, '방문 정보 접근 유지 ' + width + '/' + scale)
    }
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = '' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'output/playwright/g6-waiting-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1100, height: 900 })
  await page.getByRole('button', { name: '근거 없음 → 알 수 없음', exact: true }).click()
  await page.screenshot({ path: 'output/playwright/g6-unknown-desktop.png', fullPage: true })
  await page.getByRole('button', { name: '근거 있음 (1명당 5분)', exact: true }).click()
  return { passed: results.length, results }
}
