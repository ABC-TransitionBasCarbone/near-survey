'use client'

import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {

  const urlParams = new URLSearchParams(window.location.search);
  const broadcastId = urlParams.get('broadcast_id');
  const broadcastChannel = urlParams.get('broadcast_channel');
  const neighborhoodId = urlParams.get('neighborhood');

  if (broadcastChannel && broadcastId && neighborhoodId) {
    const simulationInfo = {
      broadcastId: broadcastId,
      broadcastChannel: broadcastChannel,
      neighborhoodId: neighborhoodId,
    }

    const oldLocalStorage = localStorage.getItem('near-id::v1')
    localStorage.setItem(
      'near-id::v1',
      JSON.stringify({
        ...JSON.parse(oldLocalStorage || '{}'),
        ...simulationInfo,
      })
    )
  }

  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile isSticky={isSticky} />

      {/* Displayed only on desktop */}
      <HeaderDesktop isSticky={isSticky} />
    </>
  )
}
